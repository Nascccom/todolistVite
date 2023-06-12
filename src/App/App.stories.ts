import type {Meta, StoryObj} from '@storybook/react';
import {ReduxStoreDecorator} from "../store/ReduxStoreDecorator/ReduxStoreDecorator";
import App from "./App";


const meta: Meta<typeof App> = {
    title: 'TODOLISTS/App',
    component: App,
    tags: ['autodocs'],
    decorators: [ReduxStoreDecorator],

}

export default meta;
type Story = StoryObj<typeof App>;

export const AppWithTodolists: Story = {

}





