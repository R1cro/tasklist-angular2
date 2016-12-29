import { Component } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
    moduleId: module.id,
    selector: 'mytasklist',
    templateUrl: 'app.component.html',
    providers: [TaskService]
})

export class AppComponent {}
