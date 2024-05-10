"use server"
import {auth} from '../lib/auth'

export const getUser = async() => {
    const session = await auth()
    return session;
}