import fakeDataStorage from './fakeDataStorage.json';
import fakeDataProvider from 'ra-data-fakerest';

export const fakeJsonDataProvider = fakeDataProvider({
    achievement: fakeDataStorage.achievement,
    user: fakeDataStorage.user,
    user112achievements: fakeDataStorage.user112achievements,
});

export async function waitAsync(milliseconds: number): Promise<void> {
    console.log(`Delay ${milliseconds}...`);
    await new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

const waitHandler = {
    get(target: any, prop: any, receiver: any) {
        return new Promise(function(resolve, reject) {
            waitAsync(300)
                .then(() => resolve(Reflect.get(target, prop, receiver)));
        });
    },
};

export const reproDataProvider = new Proxy(fakeJsonDataProvider, waitHandler);
