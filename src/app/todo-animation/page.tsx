"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SunIcon, GrassIcon, TreeIcon, CloudIcon, CloudSmallIcon } from "./icons";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Drink water", completed: false },
    { id: 2, text: "Go for a walk", completed: false },
    { id: 3, text: "Read a book", completed: false },
    { id: 4, text: "Eat healthy", completed: false },
  ]);
  const [input, setInput] = useState("");

  const progress = todos.length === 0 ? 0 : todos.filter((t) => t.completed).length / todos.length;

  // refs for GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const grassRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const cloudSmallRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  const animatedStage = useRef(0);

  // 🌍 World animation
  useEffect(() => {
    const stage = Math.floor(progress * 4);

    if (stage === animatedStage.current) return;

    const tl = gsap.timeline();
    animatedStage.current = stage;

    if (stage >= 1) {
      gsap.fromTo(
        containerRef.current,
        { background: "linear-gradient(to bottom, #D1EDFF, #D1EDFF)" },
        {
          background: "linear-gradient(to bottom, #D1EDFF, #F0FAFF)",
          duration: 1,
          transformOrigin: "top",
          ease: "power2.inOut",
        }
      );
      tl.to(grassRef.current, {
        scaleY: 1,
        opacity: 1,
        duration: 0.5,
        transformOrigin: "bottom",
        ease: "power2.out",
      });
    }
    if (stage >= 2) {
      gsap.fromTo(
        containerRef.current,
        { background: "linear-gradient(to bottom, #D1EDFF, #F0FAFF)" },
        {
          background: "linear-gradient(to bottom, #BFECFF, #F0FAFF)",
          duration: 1,
          transformOrigin: "top",
          ease: "power2.inOut",
        }
      );
      tl.to(cloudRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
      tl.to(cloudSmallRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (stage >= 3) {
      gsap.fromTo(
        containerRef.current,
        { background: "linear-gradient(to bottom, #BFECFF, #F0FAFF)" },
        {
          background: "linear-gradient(to bottom, #B3E9FF, #F0FAFF)",
          duration: 1,
          transformOrigin: "top",
          ease: "power2.inOut",
        }
      );
      tl.to(
        treeRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.3"
      );
    }

    if (stage >= 4) {
      gsap.fromTo(
        containerRef.current,
        { background: "linear-gradient(to bottom, #B3E9FF, #F0FAFF)" },
        {
          background: "linear-gradient(to bottom, #95DFFC, #F0FAFF)",
          duration: 1,
          transformOrigin: "top",
          ease: "power2.inOut",
        }
      );
      tl.to(
        sunRef.current,
        {
          scale: 1.2,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
      gsap.to(sunRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 4,
        ease: "linear",
      });
    }
  }, [progress]);

  const toggleTodo = (id: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    gsap.fromTo(e.currentTarget, { scale: 0.95 }, { scale: 1, duration: 0.2 });
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B7E3FF] to-[#EAF7FF] flex flex-col items-center p-6 gap-6">
      {/* 🌍 WORLD */}
      <div
        className="w-full max-w-xl h-64 relative rounded-3xl bg-white/30 backdrop-blur-md shadow-lg overflow-hidden"
        ref={containerRef}
      >
        <SunIcon ref={sunRef} />
        <CloudIcon ref={cloudRef} />
        <CloudSmallIcon ref={cloudSmallRef} />
        <GrassIcon ref={grassRef} />
        <TreeIcon ref={treeRef} />
      </div>

      {/* ✅ TODO LIST */}
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-3">🌱 My Tasks</h2>

        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Plant a new goal..."
            className="flex-1 px-3 py-2 rounded-full border outline-none"
          />
          <button onClick={addTodo} className="px-4 py-2 bg-green-500 text-white rounded-full">
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              onClick={(e) => toggleTodo(todo.id, e)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                todo.completed ? "bg-green-100 line-through text-gray-400" : "bg-white"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  todo.completed ? "bg-gradient-to-t from-green-500 to-green-300" : ""
                }`}
              />
              {todo.text}
            </div>
          ))}
        </div>
      </div>

      {/* 📊 PROGRESS */}
      <div className="w-full max-w-xl">
        <div className="h-3 bg-white/50 rounded-full overflow-hidden">
          <div className="h-full bg-green-400 transition-all" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
