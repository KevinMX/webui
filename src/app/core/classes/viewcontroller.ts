import { CoreEvent } from 'app/interfaces/events';
import { Subject } from 'rxjs';
import { View } from 'app/core/classes/view';
import { Action } from 'app/core/classes/viewcontrol';

export interface ViewControllerOptions {
  events: Subject<CoreEvent>;
}

export abstract class ViewController {
  name = 'ViewController';
  protected controlEvents: Subject<CoreEvent>;

  constructor(options?: ViewControllerOptions) {
    if (options) {
      this.setControlEvents(options.events);
    } else {
      this.setControlEvents();
    }
  }

  setControlEvents(subj?: Subject<CoreEvent>): void {
    if (subj) {
      this.controlEvents = subj;
    } else {
      this.controlEvents = new Subject();
    }
  }
}
