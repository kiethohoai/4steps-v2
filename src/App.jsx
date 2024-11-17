const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: true },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Pocket 3', quantity: 20, packed: false },
  { id: 4, description: 'Sony ZV1', quantity: 30, packed: false },
];

export default function App() {
  return (
    <div>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form() {
  return <div className="add-form">What do you need for your trip? 😘</div>;
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item, i) => (
          <Item item={item} key={`id-${i}`} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items on your lists, and you already packed X (X%)</em>
    </footer>
  );
}
