import { useState } from 'react';

const initialFriends = [
  {
    id: 777777,
    name: 'Thuy',
    image: 'https://i.pravatar.cc/48?u=12312237213242',
    balance: -7,
  },
  {
    id: 888888,
    name: 'Ly',
    image: 'https://i.pravatar.cc/48/?u=2347612323424',
    balance: 8,
  },
  {
    id: 999999,
    name: 'Tam',
    image: 'https://i.pravatar.cc/48/?u=2340232384234',
    balance: 9,
  },
];

const randomFriends = [
  {
    id: 111111,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 222222,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 333333,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
  {
    id: 444444,
    name: 'Ngan',
    image: 'https://i.pravatar.cc/48?u=1231237213',
    balance: -7,
  },
  {
    id: 555555,
    name: 'Diep',
    image: 'https://i.pravatar.cc/48/?u=23476123',
    balance: 20,
  },
  {
    id: 666666,
    name: 'Mini',
    image: 'https://i.pravatar.cc/48/?u=2340034',
    balance: 0,
  },
];

function getRandomId(min = 100000, max = 999999) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowHideAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((selected) =>
      selected?.id === friend?.id ? null : friend,
    );
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowHideAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend?.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe You {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance === 0 && <p className="">You & {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const id = getRandomId();
  const index = Math.floor(Math.random() * 5) + 1;

  const nameInit = randomFriends[index].name;
  const imageInit = randomFriends[index].image;

  const [name, setName] = useState(nameInit);
  const [image, setImage] = useState(imageInit);

  function handleOnSubmit(e) {
    /* guard */
    e.preventDefault();
    if (!name || !image) return;

    /* data */
    const newFriend = {
      id: id,
      name: name,
      image: image,
      balance: 0,
    };
    console.log(`🚀CHECK > newFriend:`, newFriend);

    /* add friend */
    onAddFriend(newFriend);

    /* set all state to defaul value */
    setName('');
    setImage('');
  }

  return (
    <form className="form-add-friend" onSubmit={handleOnSubmit}>
      <label>🤵 Friend</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📷 URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : '';
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  return (
    <form className="form-split-bill" onSubmit={() => {}}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🤵 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
        }
      />

      <label>👯 {selectedFriend.name} expense</label>
      <input type="text" value={paidByFriend} disabled />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
