import React, { useEffect, useRef, useState } from 'react';

export default function Toast({ open, message, onClose, duration = 3000 }) {
  const [animating, setAnimating] = useState(false);
  const barRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // keep latest onClose in a ref so the timeout handler can call it without
  // retriggering the effect when parent re-renders with a new function identity
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      setAnimating(false);
      // reset bar width for next open
      if (barRef.current) barRef.current.style.width = '100%';
      return;
    }
    setAnimating(true);
    const t = setTimeout(() => {
      if (onCloseRef.current) onCloseRef.current();
    }, duration);
    return () => clearTimeout(t);
  }, [open, duration]);

  // Kick off the width transition on mount/open
  useEffect(() => {
    if (!animating) return;
    // Force a reflow then set width to 0 to trigger transition
    requestAnimationFrame(() => {
      if (barRef.current) barRef.current.style.width = '0%';
    });
  }, [animating]);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'white',
        color: '#064e3b',
        padding: '12px 18px',
        borderRadius: 8,
        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 240,
        maxWidth: '80%',
        position: 'relative'
      }}>
        <button
          aria-label="Close notification"
          onClick={() => { if (onCloseRef.current) onCloseRef.current(); }}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 28,
            height: 28,
            borderRadius: 6,
            border: 'none',
            background: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6 L18 18 M6 18 L18 6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12.5l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="9" stroke="#10B981" strokeWidth="1.5" />
          </svg>
          <div style={{ fontSize: 14 }}>{message}</div>
        </div>

        {/* progress bar */}
        <div style={{ height: 4, background: '#e6f7ef', borderRadius: 4, overflow: 'hidden', width: '100%' }}>
          <div
            ref={barRef}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg,#10B981,#059669)',
              width: '100%',
              transition: `width ${duration}ms linear`
            }}
          />
        </div>
      </div>
    </div>
  );
}
