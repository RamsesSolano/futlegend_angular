import { Component, OnInit } from '@angular/core';
import { collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  collectionTest: any;
  collectionDataTest: Observable<DocumentData[]>;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    firestore: Firestore,
    public auth: AngularFireAuth
    ){
    this.collectionTest = collection( firestore, "Field" );
    this.collectionDataTest = new Observable< DocumentData[] >;

  }
  ngOnInit(): void {
    this.collectionDataTest = collectionData( this.collectionTest );
    this.collectionDataTest.subscribe( dataInformation => {
      console.log( dataInformation );
    } );

  }

  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  login() {
    console.log( this.loginForm.value );
  }
  logout() {
    this.auth.signOut();
  }




}
