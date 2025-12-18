const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Dùng link DB mới bạn vừa lấy từ Project1NEW
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Hệ thống MỚI đã thông qua biến môi trường!"))
  .catch(err => console.log("Lỗi kết nối: ", err));

const User = mongoose.model('User', new mongoose.Schema({ name: String, email: String }));

app.get('/api/users', async (req, res) => res.json(await User.find()));
app.post('/api/users', async (req, res) => res.json(await new User(req.body).save()));
app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(process.env.PORT || 5000);