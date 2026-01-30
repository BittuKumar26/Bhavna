const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const EMOTIONS_FILE = path.join(DATA_DIR, 'emotions.json');

// Initialize storage
const initStorage = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(EMOTIONS_FILE)) {
    fs.writeFileSync(EMOTIONS_FILE, JSON.stringify([], null, 2));
  }
};

// Read data from file
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data) || [];
  } catch {
    return [];
  }
};

const readEmotions = () => {
  try {
    const data = fs.readFileSync(EMOTIONS_FILE, 'utf8');
    return JSON.parse(data) || [];
  } catch {
    return [];
  }
};

// Write data to file
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

const writeEmotions = (emotions) => {
  fs.writeFileSync(EMOTIONS_FILE, JSON.stringify(emotions, null, 2));
};

// Hash password
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// User operations
const users = {
  findOne: (filter) => {
    const allUsers = readUsers();
    if (filter.email) {
      return allUsers.find(u => u.email === filter.email) || null;
    }
    return null;
  },

  create: (userData) => {
    const allUsers = readUsers();
    const user = {
      _id: crypto.randomUUID(),
      ...userData,
      password: hashPassword(userData.password),
      createdAt: new Date().toISOString(),
    };
    allUsers.push(user);
    writeUsers(allUsers);
    return user;
  },

  findById: (id) => {
    const allUsers = readUsers();
    return allUsers.find(u => u._id === id) || null;
  },
};

// Emotion operations
const emotions = {
  create: (emotionData) => {
    const allEmotions = readEmotions();
    const emotion = {
      _id: crypto.randomUUID(),
      ...emotionData,
      timestamp: new Date().toISOString(),
    };
    allEmotions.push(emotion);
    writeEmotions(allEmotions);
    return emotion;
  },

  find: (filter) => {
    let allEmotions = readEmotions();
    if (filter.userId) {
      allEmotions = allEmotions.filter(e => e.userId === filter.userId);
    }
    if (filter.timestamp && filter.timestamp.$gte) {
      allEmotions = allEmotions.filter(e => 
        new Date(e.timestamp) >= new Date(filter.timestamp.$gte)
      );
    }
    return allEmotions.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
  },

  findByUserId: (userId, days = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let allEmotions = readEmotions();
    return allEmotions.filter(e =>
      e.userId === userId && new Date(e.timestamp) >= startDate
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  delete: (emotionId, userId) => {
    const allEmotions = readEmotions();
    const emotion = allEmotions.find(e => e._id === emotionId && e.userId === userId);
    
    if (!emotion) return false;
    
    const filtered = allEmotions.filter(e => e._id !== emotionId);
    writeEmotions(filtered);
    return true;
  },

  deleteMany: (emotionIds, userId) => {
    const allEmotions = readEmotions();
    const filtered = allEmotions.filter(e => 
      !(emotionIds.includes(e._id) && e.userId === userId)
    );
    writeEmotions(filtered);
    return true;
  },
};

// Verify password
const comparePassword = (inputPassword, hashedPassword) => {
  return hashPassword(inputPassword) === hashedPassword;
};

// Initialize on load
initStorage();

module.exports = {
  users,
  emotions,
  comparePassword,
  hashPassword,
};
