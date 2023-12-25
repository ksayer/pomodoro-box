import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as Statistic } from './statistic.svg';
import { ReactComponent as Menu } from './menu.svg';
import { ReactComponent as Plus } from './plus.svg';
import { ReactComponent as Minus } from './minus.svg';
import { ReactComponent as Edit } from './edit.svg';
import { ReactComponent as Delete } from './delete.svg';
import { ReactComponent as FilledPlus } from './filledPlus.svg';
import { ReactComponent as Tomato } from './tomato.svg';
import { ReactComponent as SmileTomato } from './smile-tomato.svg';
import { ReactComponent as Focus } from './focus.svg';
import { ReactComponent as Pause } from './pause.svg';
import { ReactComponent as Stop } from './stop.svg';
import { ReactComponent as Settings } from './settings.svg';

export type IconName =
  | 'logo'
  | 'statistic'
  | 'menu'
  | 'minus'
  | 'edit'
  | 'delete'
  | 'plus'
  | 'filledPlus'
  | 'tomato'
  | 'smileTomato'
  | 'focus'
  | 'stop'
  | 'pause'
  | 'settings';

export const svgIconConfig = {
  logo: { component: Logo, width: 40, height: 40 },
  statistic: { component: Statistic, width: 24, height: 24 },
  menu: { component: Menu, width: 26, height: 6 },
  plus: { component: Plus, width: 18, height: 18 },
  minus: { component: Minus, width: 18, height: 18 },
  edit: { component: Edit, width: 18, height: 18 },
  delete: { component: Delete, width: 18, height: 18 },
  filledPlus: { component: FilledPlus, width: 50, height: 50 },
  tomato: { component: Tomato, width: 81, height: 81 },
  smileTomato: { component: SmileTomato, width: 115, height: 115 },
  focus: { component: Focus, width: 129, height: 129 },
  stop: { component: Stop, width: 129, height: 129 },
  pause: { component: Pause, width: 129, height: 129 },
  settings: { component: Settings, width: 62, height: 45 },
};
