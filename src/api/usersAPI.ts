import { FilterType } from './../redux/usersReducer';
import { UserType } from '../types/types';
import { instance, ResponseType } from './api';

export type GetUsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: string
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 1, filter: FilterType ={ term: "", friend: null} ) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}
        &term=${filter.term}` + (filter.friend === null ?  '' : `&friend=${filter.friend}`))
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(response => response.data);
    },
    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<ResponseType>;
    }
};
