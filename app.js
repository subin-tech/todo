// ===== 상수 =====
const STORAGE_KEY = "todo-app__todos";

// ===== DOM 요소 =====
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");
const itemsLeftEl = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

// ===== 상태 =====
let todos = loadTodos();
let currentFilter = "all"; // 'all' | 'active' | 'completed'

// ===== 데이터 영속화 (localStorage) =====
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Todo 데이터를 불러오는 중 오류 발생:", err);
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ===== 유틸 =====
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getFilteredTodos() {
  switch (currentFilter) {
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
}

// ===== 기능 1: Todo 추가 =====
function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  todos.push({
    id: generateId(),
    text: trimmed,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  saveTodos();
  render();
}

// ===== 기능 2: Todo 삭제 =====
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

// ===== 기능 3: 완료/미완료 전환 =====
function toggleTodo(id) {
  todos = todos.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTodos();
  render();
}

// 완료된 항목 일괄 삭제 (부가 기능)
function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  render();
}

// ===== 기능 4: Todo 목록 표시 (렌더링) =====
function render() {
  const filtered = getFilteredTodos();

  list.innerHTML = "";

  filtered.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " is-completed" : "");
    li.dataset.id = todo.id;

    li.innerHTML = `
      <input type="checkbox" class="todo-item__checkbox" ${
        todo.completed ? "checked" : ""
      } />
      <span class="todo-item__text"></span>
      <button type="button" class="todo-item__delete" aria-label="삭제">✕</button>
    `;

    // XSS 방지를 위해 textContent로 텍스트 삽입
    li.querySelector(".todo-item__text").textContent = todo.text;

    list.appendChild(li);
  });

  emptyState.hidden = filtered.length !== 0;

  const remaining = todos.filter((t) => !t.completed).length;
  itemsLeftEl.textContent = `${remaining}개 남음`;
}

// ===== 이벤트 바인딩 =====

// Todo 추가 (폼 제출 = 버튼 클릭 또는 Enter)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(input.value);
  input.value = "";
  input.focus();
});

// 목록 클릭 이벤트 위임 (체크박스 토글 / 삭제 버튼)
list.addEventListener("click", (e) => {
  const li = e.target.closest(".todo-item");
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.classList.contains("todo-item__checkbox")) {
    toggleTodo(id);
  } else if (e.target.classList.contains("todo-item__delete")) {
    deleteTodo(id);
  }
});

// 완료 항목 일괄 삭제
clearCompletedBtn.addEventListener("click", clearCompleted);

// 필터 버튼
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

// ===== 초기 렌더링 (기능 5: 페이지 로드 시 데이터 복원) =====
render();
