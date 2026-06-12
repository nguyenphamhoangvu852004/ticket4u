package com.ticket4u.infrastructure.repositoryImplementation;

import org.springframework.stereotype.Repository;

import com.ticket4u.domain.repositoryInterface.IUserClient;
import com.ticket4u.domain.vo.User;

@Repository
public class UserClientImpl implements IUserClient {
    @Override
    public User GetUserByID(String id) {
        return new User(id, "name of user " + id);
    }

    @Override
    public boolean IsExists(String id) {
        // call api and cache here to get user infomation
        if (id != "") {
            return true;
        } else {
            return false;
        }
    }

}
