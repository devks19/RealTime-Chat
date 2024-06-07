import { Client, Databases } from 'appwrite';

export const PROJECT_ID = '665ab12a002d0f3eb960'
export const DATABASE_ID = '665ab246003b8af386ef'
export const COLLECTION_ID_MESSEGES = '665ab25300227704cd91'

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('665ab12a002d0f3eb960');

export const databases = new Databases(client);

export default client