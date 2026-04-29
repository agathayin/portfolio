export interface Project {
  name?: string;
  headline: string;
  summary: string;
  techStack: string[];
  thumbnail: string;
  link: string;
}

export const projects: Project[] = [
  {
    headline: "Inventory Management system",
    thumbnail: "https://agathayin.github.io/inventory4d/images/cover.png",
    link: "https://agathayin.github.io/inventory4d/index.html",
    summary:
      "MERN & MEAN stack for inventory management and order management systems.",
    techStack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "AngularJS",
      "TypeScript",
    ],
  },
  {
    headline: "Etomon",
    thumbnail: "https://agathayin.github.io/etomon/img/upcoming_classes.png",
    summary:
      "Website pages written in Node, Express, Vanilla Javascript, jQuery and React.",
    techStack: ["Node.js", "Express", "JavaScript", "jQuery", "React"],
    link: "https://agathayin.github.io//etomon/index.html",
  },
  {
    name: "Product List with Cart",
    headline: "E-commerce Product List & Cart",
    summary:
      "A product list and cart interface with add/remove, quantity adjustment, and order confirmation. Responsive and interactive shopping experience.",
    techStack: ["Next.js", "React", "TypeScript", "SCSS", "Tailwind"],
    thumbnail:
      "https://agathayin.github.io/images/screenshot_product-list-with-cart.png",
    link: "/product-list-with-cart",
  },
  {
    headline: "Room Homepage",
    thumbnail: "https://agathayin.github.io/images/room-homepage-preview.jpg",
    link: "https://agathayin.net/news-homepage",
    summary:
      "Responsive landing page with slider built with React, Next.js, TypeScript, and Tailwind CSS",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    headline: "Sunnyside",
    thumbnail: "https://agathayin.github.io/sunnyside/images/cover.jpg",
    link: "https://agathayin.github.io/sunnyside/index.html",
    summary: "Landing page with responsive design using Flexbox and CSS Grid",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    headline: "Rock Paper Scissors",
    thumbnail:
      "https://agathayin.github.io/rock-paper-scissors-master/images/screenshot.png",
    link: "https://agathayin.github.io/rock-paper-scissors-master/index.html",
    summary:
      "Interactive web game with jQuery, CSS shadows, grid, and animation",
    techStack: ["jQuery", "CSS", "JavaScript"],
  },

  {
    headline: "Real-time clock without hands challenge",
    thumbnail: "https://agathayin.github.io/images/clock_day.gif",
    link: "https://agathayin.github.io/clock/myCanvas/index.html",
    summary:
      "Express time with imagination and no numbers and no clock hands. Built with P5.js",
    techStack: ["P5.js", "JavaScript"],
  },
  {
    headline: "Age Calculator",
    thumbnail:
      "https://agathayin.github.io/age-calculator-app-main/screenshot.jpg",
    link: "https://agathayin.github.io/age-calculator-app-main/index.html",
    summary: "JavaScript project about time calculation",
    techStack: ["JavaScript"],
  },
  {
    headline: "The Artists Forum",
    thumbnail: "https://agathayin.github.io/images/bootstrap.png",
    link: "https://agathayin.github.io/theartistsforum/index.html",
    summary: "Use Bootstrap to create new interface for a current website",
    techStack: ["Bootstrap", "HTML", "CSS"],
  },
  {
    headline: "P5.js data visualization",
    thumbnail: "https://agathayin.github.io/images/p5.gif",
    link: "https://agathayin.github.io/fake-news/index.html",
    summary:
      "Fake news vs fact-checking data visualization. It uses JavaScript for analyzing and P5.js for visualization.",
    techStack: ["P5.js", "JavaScript"],
  },
  {
    headline: "Interactive design and SVG practice",
    thumbnail: "https://agathayin.github.io/images/harry_potter.png",
    link: "https://agathayin.github.io/HP/index.html",
    summary:
      "Harry Potter Fanbook website. This project practices JavaScript SVG coding and Illustration.",
    techStack: ["JavaScript", "SVG"],
  },
  {
    headline: "Pod request access landing page",
    thumbnail: "https://agathayin.github.io/images/pod_request_access.jpg",
    link: "https://agathayin.github.io/pod/index.html",
    summary: "Responsive website with vanilla CSS and JavaScript",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    headline: "Coming Soon",
    thumbnail:
      "https://agathayin.github.io/base-apparel-coming-soon-master/images/hero-desktop.jpg",
    link: "https://agathayin.github.io/base-apparel-coming-soon-master/index.html",
    summary: "Customized input box and form validation using JavaScript",
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    headline: "Intro Section with Dropdown Navigation",
    thumbnail: "https://agathayin.github.io/images/screenshot_intro.png",
    link: "https://agathayin.net/intro-section-with-dropdown-navigation",
    summary:
      "A landing page with dropdown navigation menus, responsive hero section, and client logos.",
    techStack: ["React", "Tailwind"],
  },
  {
    headline: "Space Tourism",
    thumbnail:
      "https://agathayin.github.io/space-tourism/assets/home/background-home-desktop.jpg",
    link: "https://agathayin.github.io/space-tourism/index.html",
    summary: "Responsive website with CSS and jQuery",
    techStack: ["HTML", "CSS", "jQuery"],
  },
  {
    name: "Room Homepage",
    headline: "Modern Furniture Store Homepage",
    summary:
      "A modern, responsive furniture store homepage with an image slider, navigation menu, and about section. Built as a Frontend Mentor challenge.",
    techStack: ["Next.js", "React", "Tailwind", "TypeScript"],
    thumbnail: "/room-homepage/images/desktop-image-hero-1.jpg",
    link: "/room-homepage",
  },
  {
    name: "News Homepage",
    headline: "Web 3.0 News Homepage",
    summary:
      "A news homepage featuring Web 3.0 topics, responsive layout, and modern design. Built for Frontend Mentor.",
    techStack: ["Next.js", "React", "TypeScript", "SCSS"],
    thumbnail: "/room-homepage/images/desktop-image-hero-2.jpg",
    link: "/news-homepage",
  },
  {
    name: "Shortly URL Shortener",
    headline: "Shortly URL Shortening App",
    summary:
      "LocalStorage and API project built with React, Next.js, TypeScript, and Tailwind CSS",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind"],
    thumbnail: "/images/url-shortening.png",
    link: "/url-shortening",
  },
  {
    name: "Todo Animation",
    headline: "Animated Todo List",
    summary:
      "A playful todo list with animated world progress using GSAP. Features interactive tasks and visual feedback.",
    techStack: ["Next.js", "React", "TypeScript", "GSAP"],
    thumbnail: "/images/todo-animation.png",
    link: "/todo-animation",
  },
];
