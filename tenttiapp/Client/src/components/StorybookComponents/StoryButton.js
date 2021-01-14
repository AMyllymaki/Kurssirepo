import Button from '@material-ui/core/Button';
import './StoryButton.css'

function StoryButton (props)
{
    const {color = "color", children, ...rest} = props

    return(

        <Button className={`Button ${color}`} color={color} variant='contained'{...rest}>
            {children}
        </Button>
    )
}

export default StoryButton