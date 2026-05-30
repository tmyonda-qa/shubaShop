import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Features } from './features/features';
import { PopularProducts } from './popular-products/popular-products';

@Component({
  selector: 'app-home',
  imports: [Hero, Features, PopularProducts],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
