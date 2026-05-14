export let users = [
  {
    id: 1, name: "Rohan Mehta", email: "rohan.mehta@myoperator.co", phone: "+91 98765 43210",
    role: "Admin", department: "Engineering", status: "Active", loginEnabled: true,
    isAdmin: "Group Admin", googleProfile: "https://linkedin.com/in/rohanmehta", fbProfile: "", linkedinProfile: "https://linkedin.com/in/rohanmehta",
    pipedriveUid: "12847", zohoId: "zoho_rohan_001", zohoIdType: "Admin", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "AS", joinDate: "2023-01-15", lastActive: "2024-05-12T09:30:00", location: "Delhi, India",
    bio: "Senior Engineering Lead with 8+ years of experience in building scalable web applications.",
    apiToken: "a1b2c3d4e5f67890", address: "123 Rajendra Place, Delhi"
  },
  {
    id: 2, name: "Priya Patel", email: "priya.patel@myoperator.co", phone: "+91 98765 43211",
    role: "Manager", department: "Product", status: "Active", loginEnabled: true,
    isAdmin: "Not Admin", googleProfile: "https://linkedin.com/in/priyapatel", fbProfile: "https://facebook.com/priya.patel", linkedinProfile: "https://linkedin.com/in/priyapatel",
    pipedriveUid: "12848", zohoId: "zoho_priya_002", zohoIdType: "User", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "PP", joinDate: "2023-03-22", lastActive: "2024-05-11T16:45:00", location: "Mumbai, India",
    bio: "Product Manager passionate about user-centric design and data-driven decisions.",
    apiToken: "b2c3d4e5f6a78901", address: "45 Marine Lines, Mumbai"
  },
  {
    id: 3, name: "Rahul Verma", email: "rahul.verma@myoperator.co", phone: "+91 98765 43212",
    role: "Developer", department: "Engineering", status: "Active", loginEnabled: true,
    isAdmin: "Not Admin", googleProfile: "https://github.com/rahulverma", fbProfile: "", linkedinProfile: "https://linkedin.com/in/rahulverma",
    pipedriveUid: "12849", zohoId: "zoho_rahul_003", zohoIdType: "User", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "RV", joinDate: "2023-06-10", lastActive: "2024-05-12T08:15:00", location: "Bangalore, India",
    bio: "Full-stack developer specializing in React and Node.js ecosystems.",
    apiToken: "c3d4e5f6a7b89012", address: "78 Koramangala, Bangalore"
  },
  {
    id: 4, name: "Sneha Gupta", email: "sneha.gupta@myoperator.co", phone: "+91 98765 43213",
    role: "Designer", department: "Design", status: "Inactive", loginEnabled: false,
    isAdmin: "Not Admin", googleProfile: "https://dribbble.com/snehagupta", fbProfile: "https://facebook.com/sneha.gupta", linkedinProfile: "https://linkedin.com/in/snehagupta",
    pipedriveUid: "12850", zohoId: "", zohoIdType: "", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "SG", joinDate: "2023-08-05", lastActive: "2024-04-28T14:20:00", location: "Hyderabad, India",
    bio: "UI/UX Designer focused on creating intuitive and accessible user interfaces.",
    apiToken: "d4e5f6a7b8c90123", address: "12 Gachibowli, Hyderabad"
  },
  {
    id: 5, name: "Vikram Singh", email: "vikram.singh@myoperator.co", phone: "+91 98765 43214",
    role: "Admin", department: "Operations", status: "Active", loginEnabled: true,
    isAdmin: "Group Admin", googleProfile: "https://linkedin.com/in/vikramsingh", fbProfile: "", linkedinProfile: "https://linkedin.com/in/vikramsingh",
    pipedriveUid: "12851", zohoId: "zoho_vikram_005", zohoIdType: "Admin", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "VS", joinDate: "2023-02-18", lastActive: "2024-05-12T10:00:00", location: "Pune, India",
    bio: "Operations Manager ensuring smooth day-to-day business processes.",
    apiToken: "e5f6a7b8c9d01234", address: "90 MG Road, Pune"
  },
  {
    id: 6, name: "Neha Reddy", email: "neha.reddy@myoperator.co", phone: "+91 98765 43215",
    role: "Developer", department: "Engineering", status: "Active", loginEnabled: true,
    isAdmin: "Not Admin", googleProfile: "https://github.com/nehareddy", fbProfile: "", linkedinProfile: "https://linkedin.com/in/nehareddy",
    pipedriveUid: "12852", zohoId: "zoho_neha_006", zohoIdType: "User", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "NR", joinDate: "2023-09-12", lastActive: "2024-05-11T18:30:00", location: "Chennai, India",
    bio: "Backend developer with expertise in Python, Go, and cloud infrastructure.",
    apiToken: "f6a7b8c9d0e12345", address: "34 T Nagar, Chennai"
  },
  {
    id: 7, name: "Arjun Kumar", email: "arjun.kumar@myoperator.co", phone: "+91 98765 43216",
    role: "Manager", department: "Sales", status: "Active", loginEnabled: true,
    isAdmin: "Not Admin", googleProfile: "https://linkedin.com/in/arjunkumar", fbProfile: "https://facebook.com/arjun.kumar", linkedinProfile: "https://linkedin.com/in/arjunkumar",
    pipedriveUid: "12853", zohoId: "zoho_arjun_007", zohoIdType: "User", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "AK", joinDate: "2023-04-30", lastActive: "2024-05-12T11:45:00", location: "Delhi, India",
    bio: "Sales leader driving revenue growth through strategic partnerships.",
    apiToken: "a7b8c9d0e1f23456", address: "56 Connaught Place, Delhi"
  },
  {
    id: 8, name: "Meera Iyer", email: "meera.iyer@myoperator.co", phone: "+91 98765 43217",
    role: "Designer", department: "Design", status: "Active", loginEnabled: false,
    isAdmin: "Not Admin", googleProfile: "https://dribbble.com/meeraiyer", fbProfile: "", linkedinProfile: "https://linkedin.com/in/meeraiyer",
    pipedriveUid: "12854", zohoId: "zoho_meera_008", zohoIdType: "User", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "MI", joinDate: "2023-11-20", lastActive: "2024-05-10T15:00:00", location: "Bangalore, India",
    bio: "Creative designer bringing brand stories to life through visual design.",
    apiToken: "b8c9d0e1f2a34567", address: "89 Indiranagar, Bangalore"
  },
  {
    id: 9, name: "Karan Malhotra", email: "karan.malhotra@myoperator.co", phone: "+91 98765 43218",
    role: "Developer", department: "Engineering", status: "Inactive", loginEnabled: false,
    isAdmin: "Not Admin", googleProfile: "https://github.com/karanmalhotra", fbProfile: "https://facebook.com/karan.malhotra", linkedinProfile: "https://linkedin.com/in/karanmalhotra",
    pipedriveUid: "12855", zohoId: "", zohoIdType: "", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "KM", joinDate: "2023-07-08", lastActive: "2024-04-15T09:00:00", location: "Mumbai, India",
    bio: "Frontend developer focused on performance and accessibility.",
    apiToken: "c9d0e1f2a3b45678", address: "22 Bandra West, Mumbai"
  },
  {
    id: 10, name: "Divya Nair", email: "divya.nair@myoperator.co", phone: "+91 98765 43219",
    role: "Admin", department: "HR", status: "Active", loginEnabled: true,
    isAdmin: "Group Admin", googleProfile: "https://linkedin.com/in/divyanair", fbProfile: "", linkedinProfile: "https://linkedin.com/in/divyanair",
    pipedriveUid: "12856", zohoId: "zoho_divya_010", zohoIdType: "Admin", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "DN", joinDate: "2023-05-25", lastActive: "2024-05-12T08:45:00", location: "Kochi, India",
    bio: "HR Administrator managing talent acquisition and employee engagement.",
    apiToken: "d0e1f2a3b4c56789", address: "67 Marine Drive, Kochi"
  },
  {
    id: 11, name: "Rohan Desai", email: "rohan.desai@myoperator.co", phone: "+91 98765 43220",
    role: "Manager", department: "Marketing", status: "Active", loginEnabled: false,
    isAdmin: "Not Admin", googleProfile: "https://linkedin.com/in/rohandesai", fbProfile: "https://facebook.com/rohan.desai", linkedinProfile: "https://linkedin.com/in/rohandesai",
    pipedriveUid: "12857", zohoId: "zoho_rohan_011", zohoIdType: "User", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "RD", joinDate: "2023-10-14", lastActive: "2024-05-11T12:30:00", location: "Ahmedabad, India",
    bio: "Marketing strategist building brand presence across digital channels.",
    apiToken: "e1f2a3b4c5d67890", address: "11 SG Highway, Ahmedabad"
  },
  {
    id: 12, name: "Ananya Bose", email: "ananya.bose@myoperator.co", phone: "+91 98765 43221",
    role: "Developer", department: "Engineering", status: "Active", loginEnabled: true,
    isAdmin: "Not Admin", googleProfile: "https://github.com/ananyabose", fbProfile: "", linkedinProfile: "https://linkedin.com/in/ananyabose",
    pipedriveUid: "12858", zohoId: "zoho_ananya_012", zohoIdType: "User", timezone: "Asia/Kolkata (UTC+05:30)",
    avatar: "AB", joinDate: "2024-01-10", lastActive: "2024-05-12T07:15:00", location: "Kolkata, India",
    bio: "Junior developer eager to learn and contribute to impactful projects.",
    apiToken: "f2a3b4c5d6e78901", address: "88 Park Street, Kolkata"
  }
];

export function updateUser(id, data) {
  const idx = users.findIndex((u) => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...data };
  }
}

export function deleteUser(id) {
  const idx = users.findIndex((u) => u.id === id);
  if (idx !== -1) {
    users.splice(idx, 1);
  }
}

export function addUser(data) {
  const newId = Math.max(...users.map((u) => u.id), 0) + 1;
  users.unshift({ ...data, id: newId, status: 'Active', loginEnabled: true, avatar: data.name.split(' ').map((n) => n[0]).join('').toUpperCase() });
}
