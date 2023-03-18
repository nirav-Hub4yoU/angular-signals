import { Component } from '@angular/core';
import { HomeRecord } from './home-record';
import { signal } from 'src/signals/signal';
import { computed } from 'src/signals';
import { effect } from 'src/signals/effect';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  search = signal(localStorage.getItem('searStringValue') || '');
  userRecords = signal([
    {
      name: 'John',
      age: 30,
      address: 'New York',
    },
    {
      name: 'Peter',
      age: 40,
      address: 'London',
    },
  ] as HomeRecord[]);

  filteredUserRecord = computed(() =>
    this.userRecords().filter((user) => user.name.startsWith(this.search()))
  );

  logger = effect(() => localStorage.setItem('searStringValue', this.search()));

  searchString(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
    // this.filteredUserRecord = this.userRecords().filter((user) => user.name.startsWith(this.search()));
  }

  addUser() {
    //update take callback function as parameter
    // For Performance Doesn't matter if you use update or Mutate in case of angular signal;
    this.userRecords.update((update) => [
      ...update,
      {
        name: 'buddy',
        age: 25,
        address: 'somewhere',
      },
    ]);

    // this.userRecords.mutate(user =>{user.push({name:'make', age: 25, address: 'somewhere'})});
  }
}
