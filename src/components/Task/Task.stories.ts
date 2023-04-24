import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        task: {id: 'fdf', title: 'Js', isDone: true},
        todolistId: 'ddd'
    }
}

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDone: Story = {

}