import classes from '../../styles/pages-components/preloader/preloader.module.sass'

export function Preloader(){
    return(
        <div className={classes['spinner']}>
            <div className={classes['bar1']}/>
            <div className={classes['bar2']}/>
            <div className={classes['bar3']}/>
            <div className={classes['bar4']}/>
            <div className={classes['bar5']}/>
            <div className={classes['bar6']}/>
            <div className={classes['bar7']}/>
            <div className={classes['bar8']}/>
            <div className={classes['bar9']}/>
            <div className={classes['bar10']}/>
            <div className={classes['bar11']}/>
            <div className={classes['bar12']}/>
        </div>
    )
}