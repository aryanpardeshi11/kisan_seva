import React, { useState } from 'react';
import { initialPosts, initialGroups } from '../data/agriData';
import { useAuth } from '../context/AuthContext';
import { Search, ThumbsUp, MessageSquare, Share2, PlusCircle, Users, X } from 'lucide-react';

export const CommunityView = ({ onOpenAuth }) => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState(initialPosts);
  const [groups, setGroups] = useState(initialGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('Crop Advice');

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const post = {
      id: Date.now(),
      author: currentUser ? currentUser.name : 'Sajith Disanayake',
      location: currentUser ? currentUser.location : 'Latur, MS',
      time: 'Just now',
      title: newTitle,
      content: newContent,
      likes: 0,
      comments: 0,
      tag: newTag
    };

    setPosts([post, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowPostModal(false);
  };

  return (
    <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Header & Create Post Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Farmer Community Feed</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Share experience, ask queries & connect with experts</p>
        </div>
        <button
          className="btn-secondary"
          onClick={() => {
            if (!currentUser) { onOpenAuth(); return; }
            setShowPostModal(true);
          }}
          style={{ padding: '8px 14px', fontSize: '12px' }}
        >
          <PlusCircle size={16} /> New Post
        </button>
      </div>

      {/* 8 Community Groups Slider */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '8px' }}>
          FEATURED COMMUNITY GROUPS
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {groups.map((g) => (
            <div
              key={g.id}
              className="glass-card"
              style={{
                minWidth: '160px',
                padding: '10px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '20px' }}>{g.icon}</span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', lineHeight: 1.2 }}>{g.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{g.members}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search community posts, tags or farmers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px 10px 10px 36px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '13px' }}
        />
      </div>

      {/* Feed Posts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredPosts.map((post) => (
          <div key={post.id} className="glass-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{post.author}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>📍 {post.location} • {post.time}</div>
                </div>
              </div>
              <span className="badge badge-info">{post.tag}</span>
            </div>

            <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>{post.title}</h3>
            <p style={{ fontSize: '13px', lineHeight: 1.4, color: 'var(--text-main)', marginBottom: '12px' }}>{post.content}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--text-muted)' }}>
              <button onClick={() => handleLike(post.id)} style={{ background: 'none', border: 'none', color: 'var(--secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                <ThumbsUp size={16} /> {post.likes}
              </button>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MessageSquare size={16} /> {post.comments} Comments
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto', cursor: 'pointer' }}>
                <Share2 size={16} /> Share
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showPostModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 1000 }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '440px', padding: '24px', position: 'relative' }}>
            <button onClick={() => setShowPostModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Create Community Post</h3>

            <form onSubmit={handleAddPost} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Post Title</label>
                <input type="text" placeholder="e.g. High Yield Soybean Crop Update" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Tag / Category</label>
                <select value={newTag} onChange={(e) => setNewTag(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                  <option value="Crop Advice">Crop Advice</option>
                  <option value="Pest Warning">Pest Warning</option>
                  <option value="Mandi Price">Mandi Price Alert</option>
                  <option value="Organic Farming">Organic Farming</option>
                  <option value="Government Scheme">Government Scheme</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Description / Experience</label>
                <textarea rows={4} placeholder="Describe your crop experience or question for fellow farmers..." value={newContent} onChange={(e) => setNewContent(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '12px' }} />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
                Publish Post
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
