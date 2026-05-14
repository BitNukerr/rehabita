const blogPosts = [
  { id: "choosing-vintage", title: "How to choose vintage design pieces that still feel current", date: "14 May 2026", category: "Buying Guide", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80", excerpt: "A good vintage piece has proportion, material honesty, and enough quietness to live with you rather than overpower the room.", body: ["The best vintage interiors rarely feel like museums. They work because each piece has a job: comfort, storage, light, rhythm, or contrast. Before looking at labels, start with scale and use.", "Look for materials that can age honestly: solid wood, leather, wool, stone, steel, aluminium, and well-made veneers. A few marks are part of the story, but structure matters more than surface.", "Finally, give every iconic object room to breathe. One strong chair or lamp can do more for a space than a crowded collection of references."] },
  { id: "restoration-principles", title: "Restoration without erasing the character", date: "10 May 2026", category: "Restoration", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80", excerpt: "Good reconditioning is measured, respectful, and almost invisible when the piece returns to daily use.", body: ["Restoration begins with restraint. Not every scratch needs to disappear, and not every surface should be made new. The goal is to make the piece stable, usable, and clear in its original intent.", "We separate cosmetic wear from structural damage. Joints, foam, webbing, wiring, and finishes are checked first because they decide whether the object can serve another decade.", "When replacement is necessary, materials should match the age and design language of the piece. The work should support the original object, not compete with it."] },
  { id: "circular-interiors", title: "Why circular interiors are more than a trend", date: "2 May 2026", category: "Circular Design", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?auto=format&fit=crop&w=1200&q=80", excerpt: "Choosing reconditioned furniture keeps value in circulation and creates rooms with texture, memory, and depth.", body: ["Circular interiors start with the idea that good objects should stay in use. A well-made table, sofa, or storage system already contains material, design labor, and cultural value.", "Reusing and reconditioning reduces waste, but it also improves the emotional quality of a room. Older pieces bring tone and friction against new architecture.", "The most successful circular spaces mix periods carefully: one restored anchor piece, contemporary utility where needed, and enough negative space for everything to feel intentional."] }
];
function ensureBlogNav() {
  document.querySelectorAll(".main-nav").forEach(nav => {
    if (!nav.querySelector('a[href="blog.html"]')) {
      const about = nav.querySelector('a[href="about.html"]');
      const link = document.createElement("a");
      link.href = "blog.html";
      link.textContent = "Blog";
      nav.insertBefore(link, about || nav.querySelector(".language"));
    }
  });
  document.querySelectorAll(".site-footer div").forEach(column => {
    if (column.textContent.includes("Studio") && !column.querySelector('a[href="blog.html"]')) {
      const link = document.createElement("a");
      link.href = "blog.html";
      link.textContent = "Blog";
      const contact = column.querySelector('a[href="contact.html"]');
      column.insertBefore(link, contact || null);
    }
  });
}
function renderBlogListStandalone() {
  const mount = document.querySelector("[data-blog-list]");
  if (!mount) return;
  mount.innerHTML = blogPosts.map(post => `<article class="blog-card"><a href="post.html?id=${post.id}"><img src="${post.image}" alt="${post.title}"></a><div><p class="eyebrow">${post.category}</p><h2><a href="post.html?id=${post.id}">${post.title}</a></h2><p>${post.excerpt}</p><span>${post.date}</span></div></article>`).join("");
}
function renderBlogDetailStandalone() {
  const mount = document.querySelector("[data-blog-detail]");
  if (!mount) return;
  const params = new URLSearchParams(window.location.search);
  const post = blogPosts.find(item => item.id === params.get("id")) || blogPosts[0];
  document.title = `${post.title} | re-habita`;
  mount.innerHTML = `<article class="post-article"><header class="post-hero"><p class="eyebrow">${post.category}</p><h1>${post.title}</h1><p>${post.date}</p></header><img src="${post.image}" alt="${post.title}"><div class="post-body">${post.body.map(paragraph => `<p>${paragraph}</p>`).join("")}<a class="outline-button" href="blog.html">Back to blog</a></div></article>`;
}
ensureBlogNav();
renderBlogListStandalone();
renderBlogDetailStandalone();
