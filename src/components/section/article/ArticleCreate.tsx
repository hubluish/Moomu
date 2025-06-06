import React, { useState, FormEvent } from "react";
import styles from "./ArticleList.module.css";

interface ArticleCreateProps {
  onCreate: (article: { id: string; title: string; content: string; date: string }) => void;
  onCancel: () => void;
}

export default function ArticleCreate({ onCreate, onCancel }: ArticleCreateProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onCreate({
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="내용"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className={styles.buttons}>
        <button type="submit" className={styles.submit}>등록</button>
        <button type="button" className={styles.cancel} onClick={onCancel}>취소</button>
      </div>
    </form>
  );
}