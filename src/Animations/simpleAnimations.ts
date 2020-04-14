import {trigger, state, transition, style, animate} from '@angular/animations';
import {scaleSize} from '../app/mocks';


export const startAnimationTrigger = trigger('startAnimationTrigger', [


  state('center', style({
    opacity: 1,
    transform: 'translate3d(-300px,100px,0)'
  })),



  state('extraSmall', style({
    transform: `scale(0.4)`,
  })),

  state('small', style({
    transform: `scale(0.6)`,
  })),

  state('medium', style({
    transform: `scale(1) `,
  })),

  state('big', style({
    transform: `scale(1.4) `,
  })),



  state('normal', style({})),

  transition('* => center', animate(1000)),
  transition('*  => extraSmall', animate(1000)),
  transition('*  => small', animate(1000)),
  transition('*  => medium', animate(1000)),
  transition('*  => big', animate(1000)),
  transition('void  => small', animate(1000)),



]);


export const navbarAnimationtrigger = trigger('navAnimateTrigger', [
  state('fullSc', style({transform: 'translateX(0)'})),

  transition('void => fullSc', animate(400)),


]);


export const postInputBarHandler = trigger('inputHandlerAnimation', [
  state('opened', style({height: '50%'})),
  state('closed', style({height: '0'})),
  transition('void <=> opened', animate(400)),
  transition('closed <=> opened', animate(400)),

]);


export const showAnimation = trigger('showTrigger', [
  state('show', style({opacity: 1})),

  transition('void <=> show', animate(700)),
]);
