import React from 'react';

const Features = () => {
  return (
    <div className="features">
      <h2>Возможности игры</h2>
      <ul>
        <li>Игра вдвоём на одном устройстве.</li>
        <li>Игра против робота с простым ИИ.</li>
        <li>Выбор режима игры: два игрока или против робота.</li>
        <li>Отмена последнего хода.</li>
        <li>Просмотр истории ходов и возможность перехода к любому ходу.</li>
        <li>Подсветка выигрышной линии.</li>
      </ul>
      
      <h2>Стили и оформление</h2>
      <ul>
        <li>Интерфейс, стилизованный под Windows 98.</li>
        <li>Использование пиксельного шрифта "Press Start 2P".</li>
        <li>Плавные переходы и эффекты при наведении.</li>
        <li>Современные элементы дизайна с ретро-эстетикой.</li>
      </ul>
      
      <h2>Об игре</h2>
      <p>
        Игра "Крестики-нолики" — это классическая настольная игра, в которой два игрока по очереди заполняют клетки на игровом поле 3x3 своими символами (крестиками или ноликами). Цель игры — составить ряд из трех своих символов по горизонтали, вертикали или диагонали.
      </p>
    </div>
  );
};

export default Features;