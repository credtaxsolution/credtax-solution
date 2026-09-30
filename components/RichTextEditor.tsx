'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Undo,
  Redo,
  Loader2,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  onImageUpload,
  placeholder = 'Write your article content here...',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const isUpdatingRef = useRef(false);

  // Sync external value changes into contentEditable div only when not actively typing
  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    isUpdatingRef.current = false;
  }, [value, isCodeView]);

  const handleInput = () => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const exec = (command: string, arg: string | undefined = undefined) => {
    if (isCodeView) return;
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleFormatBlock = (tag: string) => {
    if (isCodeView) return;
    editorRef.current?.focus();
    document.execCommand('formatBlock', false, tag);
    handleInput();
  };

  const handleInsertLink = () => {
    if (isCodeView) return;
    const url = prompt('Enter link URL (e.g. https://...):');
    if (url) {
      exec('createLink', url);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;

    try {
      setUploadingImage(true);
      const url = await onImageUpload(file);
      if (url) {
        if (isCodeView) {
          onChange(value + `\n<img src="${url}" alt="Article image" style="max-width:100%;height:auto;border-radius:8px;margin:24px 0;" />\n`);
        } else {
          editorRef.current?.focus();
          const imgHtml = `<p><img src="${url}" alt="Article image" style="max-width:100%;height:auto;border-radius:8px;margin:24px 0;display:block;" /></p><p></p>`;
          document.execCommand('insertHTML', false, imgHtml);
          handleInput();
        }
      }
    } catch (err: any) {
      console.error('Failed to upload image:', err);
      alert('Failed to upload image: ' + (err?.message || 'Unknown error'));
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div
      style={{
        border: '1px solid var(--line)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {/* Hidden file input for inline image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Editor Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '4px',
          padding: '8px 12px',
          background: 'var(--mist)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <button
          type="button"
          title="Heading 2"
          onClick={() => handleFormatBlock('<h2>')}
          style={btnStyle}
        >
          <Heading2 size={16} />
        </button>
        <button
          type="button"
          title="Heading 3"
          onClick={() => handleFormatBlock('<h3>')}
          style={btnStyle}
        >
          <Heading3 size={16} />
        </button>
        <button
          type="button"
          title="Heading 4"
          onClick={() => handleFormatBlock('<h4>')}
          style={btnStyle}
        >
          <Heading4 size={16} />
        </button>

        <span style={dividerStyle} />

        <button type="button" title="Bold" onClick={() => exec('bold')} style={btnStyle}>
          <Bold size={16} />
        </button>
        <button type="button" title="Italic" onClick={() => exec('italic')} style={btnStyle}>
          <Italic size={16} />
        </button>
        <button type="button" title="Underline" onClick={() => exec('underline')} style={btnStyle}>
          <Underline size={16} />
        </button>
        <button type="button" title="Strikethrough" onClick={() => exec('strikeThrough')} style={btnStyle}>
          <Strikethrough size={16} />
        </button>

        <span style={dividerStyle} />

        <button
          type="button"
          title="Bullet List"
          onClick={() => exec('insertUnorderedList')}
          style={btnStyle}
        >
          <List size={16} />
        </button>
        <button
          type="button"
          title="Numbered List"
          onClick={() => exec('insertOrderedList')}
          style={btnStyle}
        >
          <ListOrdered size={16} />
        </button>
        <button
          type="button"
          title="Blockquote"
          onClick={() => handleFormatBlock('<blockquote>')}
          style={btnStyle}
        >
          <Quote size={16} />
        </button>

        <span style={dividerStyle} />

        <button type="button" title="Insert Link" onClick={handleInsertLink} style={btnStyle}>
          <LinkIcon size={16} />
        </button>

        {onImageUpload && (
          <button
            type="button"
            title="Upload and Insert Image"
            disabled={uploadingImage}
            onClick={() => fileInputRef.current?.click()}
            style={{
              ...btnStyle,
              color: uploadingImage ? 'var(--muted)' : 'var(--navy-900)',
            }}
          >
            {uploadingImage ? <Loader2 size={16} className="spin" /> : <ImageIcon size={16} />}
          </button>
        )}

        <span style={dividerStyle} />

        <button type="button" title="Undo" onClick={() => exec('undo')} style={btnStyle}>
          <Undo size={16} />
        </button>
        <button type="button" title="Redo" onClick={() => exec('redo')} style={btnStyle}>
          <Redo size={16} />
        </button>

        <span style={{ marginLeft: 'auto' }} />

        <button
          type="button"
          title={isCodeView ? 'Switch to Visual Editor' : 'Switch to HTML Code View'}
          onClick={() => setIsCodeView(!isCodeView)}
          style={{
            ...btnStyle,
            background: isCodeView ? 'var(--navy-900)' : 'transparent',
            color: isCodeView ? '#fff' : 'var(--navy-900)',
            fontSize: '0.8rem',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Code size={15} />
          <span>{isCodeView ? 'Visual' : 'HTML'}</span>
        </button>
      </div>

      {/* Editor Body */}
      {isCodeView ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type or paste HTML code here..."
          style={{
            width: '100%',
            minHeight: '320px',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '0.88rem',
            border: 'none',
            outline: 'none',
            resize: 'vertical',
            lineHeight: '1.6',
            color: '#1E293B',
          }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          data-placeholder={placeholder}
          style={{
            minHeight: '320px',
            maxHeight: '500px',
            overflowY: 'auto',
            padding: '18px 20px',
            outline: 'none',
            fontSize: '1rem',
            lineHeight: '1.75',
            color: 'var(--ink)',
          }}
          className="rich-editor-content"
        />
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  padding: '6px 8px',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--navy-900)',
  transition: 'background 0.15s ease',
};

const dividerStyle: React.CSSProperties = {
  width: '1px',
  height: '18px',
  background: 'var(--line)',
  marginInline: '4px',
};
