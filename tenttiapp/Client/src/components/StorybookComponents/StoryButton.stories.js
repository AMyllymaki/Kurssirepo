import React from 'react'
import StoryButton from './StoryButton.js'
import Button from '@material-ui/core/Button';

export default {
    title: 'StoryButton',
    component: Button

}

export const Primary = () => <StoryButton color='primary'>Primary Button</StoryButton>
export const Secondary = () => <StoryButton color='secondary'>Secondary</StoryButton>
