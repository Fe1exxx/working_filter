import { useState, useMemo } from "react";

interface User {
  id: number;
  name: string;
  age: number;
  city: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: "Алиса", age: 25, city: "Москва", active: true },
  { id: 2, name: "Борис", age: 17, city: "Санкт-Петербург", active: false },
  { id: 3, name: "Вера", age: 30, city: "Москва", active: true },
  { id: 4, name: "Глеб", age: 22, city: "Казань", active: true },
  { id: 5, name: "Дина", age: 16, city: "Москва", active: false },
  { id: 6, name: "Егор", age: 28, city: "Екатеринбург", active: true },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyActive, setOnlyActive] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("Все");

  // 🔥 useMemo — чтобы не фильтровать на каждый ререндер
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // поиск по имени (регистронезависимо)
      if (
        searchQuery &&
        !user.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // только активные
      if (onlyActive && !user.active) {
        return false;
      }
      // фильтр по городу
      if (selectedCity !== "Все" && user.city !== selectedCity) {
        return false;
      }
      return true;
    });
  }, [searchQuery, onlyActive, selectedCity]); // зависимости

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl font-bold mb-4">Фильтр пользователей</h1>

      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск по имени..."
        className="border p-2 mb-3 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Чекбокс */}
      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={onlyActive}
          onChange={(e) => setOnlyActive(e.target.checked)}
          className="mr-2"
        />
        Только активные
      </label>

      {/* Выбор города */}
      <div className="mb-4">
        <label className="block mb-1">Город:</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="Все">Все</option>
          <option value="Москва">Москва</option>
          <option value="Казань">Казань</option>
          <option value="Санкт-Петербург">СПб</option>
          <option value="Екатеринбург">Екб</option>
        </select>
      </div>

      {/* Список */}
      <ul className="space-y-2">
        {filteredUsers.length === 0 ? (
          <li className="text-gray-500">Ничего не найдено</li>
        ) : (
          filteredUsers.map((user) => (
            <li key={user.id} className="p-2 border rounded">
              <strong>{user.name}</strong>, {user.age} лет, {user.city}
              {user.active ? " ✅" : " ⏸️"}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
