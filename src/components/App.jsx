import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

const initialItems = [
  { id: 1, description: 'Sock', quantity: 1, packed: false },
  { id: 2, description: 'Shirt', quantity: 2, packed: false },
  { id: 3, description: 'Charger', quantity: 3, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(newItem) {
    setItems((item) => [...item, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  function handleClearListItems() {
    const confirmed = window.confirm('Are you sure to deletel all items?');

    if (confirmed) setItems([]);
    else return;
  }

  return (
    <div>
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearListItems={handleClearListItems}
      />
      <Stats items={items} />
    </div>
  );
}
