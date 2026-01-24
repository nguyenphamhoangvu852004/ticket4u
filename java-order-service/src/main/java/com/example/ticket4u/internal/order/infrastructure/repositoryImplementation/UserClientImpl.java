package com.example.ticket4u.internal.order.infrastructure.repositoryImplementation;

import org.springframework.stereotype.Repository;

import com.example.ticket4u.internal.order.domain.repositoryInterface.IUserClient;
import com.example.ticket4u.internal.order.domain.vo.User;

@Repository
public class UserClientImpl implements IUserClient {
    @Override
    public User GetUserByID(String id) {
        return new User(id, "name of user " + id);
    }

    @Override
    public boolean IsExists(String id) {
        if (id != "") {
            return true;
        } else {
            return false;
        }
    }

}
