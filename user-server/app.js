require('dotenv').config({path:'./db/mysql.env'});
const express = require('express');
const app = express();//인스턴스 생성
const mysql = require('./db.js');

//서버값 제한걸기
app.use(express.json({
    limit : '50mb'
}));

//서버 열어줌
app.listen(5000, ()=>{
    console.log('Server start!')
});

// 전체조회
app.get('/t_users', async(req, res)=>{
    let list = await mysql.query('userList');
    res.send(list);
});

//부분조회
app.get('/t_users/:no', async(req, res)=>{
    let data = req.params.no;
    let result = await mysql.query('userInfo', data);
    res.send(result[0]);
});

//입력
app.post('/t_users', async(req, res)=>{
    let data = req.body.param;
    let result = await mysql.query('userInsert', data);
    res.send(result);
});

//수정
app.put('/t_users/:no', async(req, res)=>{
    let datas = [req.body.param, req.params.no];
    let result = await mysql.query('userUpdate', datas);
    res.send(result);
});

//삭제
app.delete('/t_users/:no', async(req, res)=>{
    let data = req.params.no;
    let result = await mysql.query('userDelete', data);
    res.send(result);
});


