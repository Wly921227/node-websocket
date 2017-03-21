var users = {
    insert: 'INSERT INTO users_table (u_id, u_name, u_pd, u_nickname) VALUES (0, ?, ?, ?)',
    update: 'UPDATE users_table SET u_name=?, u_pd=?, u_nickname=? WHERE u_id=?',
    delete: 'DELETE FROM users_table WHERE u_id=?',
    getUserById: 'SELECT * from users_table WHERE u_id=?',
    getAllUsers: 'SELECT * from users_table'
}

module.exports = users