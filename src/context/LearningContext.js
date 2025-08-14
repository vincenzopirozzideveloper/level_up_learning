import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const LearningContext = createContext(null);

// Accrual config (tunable for demo)
const ACCRUAL_INTERVAL_MS = 10000; // 10s
const ACCRUAL_AMOUNT = 1; // +1 credit per tick

const STORAGE_KEYS = {
  credits: "lul_credits",
  lastAccrual: "lul_lastAccrual",
  progress: "lul_progress",
};

// Demo catalog
const DEFAULT_COURSES = [
  {
    id: "bash",
    title: "Bash",
    description: "Impara Bash con micro-sfide e lezioni sbloccabili.",
    lessons: Array.from({ length: 10 }).map((_, idx) => {
      const number = idx + 1;
      const id = `L${number}`;
      const cost = number <= 3 ? 5 : number <= 6 ? 8 : 10;
      // Very simple demo challenges
      const challenge = (() => {
        if (number === 1) {
          return {
            title: "Hello World",
            prompt: "Stampa 'Hello World' in Bash",
            // validate echo hello world
            validate: (code) => /\becho\s+["']?hello world["']?\b/i.test(code || ""),
          };
        }
        if (number === 2) {
          return {
            title: "Variabili",
            prompt: "Crea una variabile NAME con il tuo nome e stampala",
            validate: (code) => /NAME=\w+/i.test(code || "") && /(echo|printf)\s+\$NAME/i.test(code || ""),
          };
        }
        if (number === 3) {
          return {
            title: "Permessi",
            prompt: "Rendi eseguibile lo script script.sh",
            validate: (code) => /chmod\s+\+x\s+script\.sh/i.test(code || ""),
          };
        }
        return {
          title: `Sfida ${number}`,
          prompt: "Scrivi un comando Bash valido relativo alla lezione.",
          validate: (code) => typeof code === "string" && code.trim().length > 0,
        };
      })();
      return { id, number, title: `Lezione ${number}`, cost, challenge };
    }),
  },
];

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
}

export function LearningProvider({ children }) {
  const [credits, setCredits] = useState(() => readJson(STORAGE_KEYS.credits, 10));
  const [progress, setProgress] = useState(() => readJson(STORAGE_KEYS.progress, {}));
  const lastAccrualRef = useRef(readJson(STORAGE_KEYS.lastAccrual, Date.now()));

  // On mount, catch up missed accruals
  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastAccrualRef.current;
    if (elapsed > ACCRUAL_INTERVAL_MS) {
      const ticks = Math.floor(elapsed / ACCRUAL_INTERVAL_MS);
      const gained = ticks * ACCRUAL_AMOUNT;
      if (gained > 0) {
        setCredits((c) => c + gained);
        lastAccrualRef.current = lastAccrualRef.current + ticks * ACCRUAL_INTERVAL_MS;
      }
    }
  }, []);

  // Ticker accrual
  useEffect(() => {
    const id = setInterval(() => {
      setCredits((c) => c + ACCRUAL_AMOUNT);
      lastAccrualRef.current = Date.now();
    }, ACCRUAL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Persist
  useEffect(() => {
    writeJson(STORAGE_KEYS.credits, credits);
  }, [credits]);
  useEffect(() => {
    writeJson(STORAGE_KEYS.progress, progress);
  }, [progress]);
  useEffect(() => {
    writeJson(STORAGE_KEYS.lastAccrual, lastAccrualRef.current);
  }, [credits, progress]);

  const getCourseById = useCallback((courseId) => {
    return DEFAULT_COURSES.find((c) => c.id === courseId) || null;
  }, []);

  const getLessonState = useCallback(
    (courseId, lessonId) => {
      const byCourse = progress[courseId] || {};
      const unlocked = (byCourse.unlocked || []).includes(lessonId);
      const completed = (byCourse.completed || []).includes(lessonId);
      return { unlocked, completed };
    },
    [progress]
  );

  const unlockLesson = useCallback((courseId, lessonId, cost) => {
    const state = getLessonState(courseId, lessonId);
    if (state.unlocked) return true;
    if (credits < cost) return false;
    setCredits((c) => c - cost);
    setProgress((p) => {
      const byCourse = p[courseId] || { unlocked: [], completed: [] };
      const next = {
        ...p,
        [courseId]: {
          unlocked: Array.from(new Set([...(byCourse.unlocked || []), lessonId])),
          completed: byCourse.completed || [],
        },
      };
      return next;
    });
    return true;
  }, [credits, getLessonState]);

  const completeLesson = useCallback((courseId, lessonId) => {
    setProgress((p) => {
      const byCourse = p[courseId] || { unlocked: [], completed: [] };
      const next = {
        ...p,
        [courseId]: {
          unlocked: Array.from(new Set([...(byCourse.unlocked || []), lessonId])),
          completed: Array.from(new Set([...(byCourse.completed || []), lessonId])),
        },
      };
      return next;
    });
    // Random dopamine reward 1-3 credits
    const bonus = 1 + Math.floor(Math.random() * 3);
    setCredits((c) => c + bonus);
    return bonus;
  }, []);

  const value = useMemo(
    () => ({
      courses: DEFAULT_COURSES,
      credits,
      setCredits,
      getCourseById,
      getLessonState,
      unlockLesson,
      completeLesson,
      accrual: { amount: ACCRUAL_AMOUNT, intervalMs: ACCRUAL_INTERVAL_MS },
    }),
    [credits, getCourseById, getLessonState, unlockLesson, completeLesson]
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error("useLearning must be used within LearningProvider");
  return ctx;
}
