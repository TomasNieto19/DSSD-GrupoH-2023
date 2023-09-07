package dao;

import entities.User;

public class AuthenticationService {
    private UserDao userDao = new UserDao();

    public User authenticate(String username, String password) {
        User user = userDao.getUserByUsernameAndPassword(username, password);
        return user;
    }
}
