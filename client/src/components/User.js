import React, { Component } from 'react';
import Swal from 'sweetalert2';

// For todays date;
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

const backgrounds = [
    "bg-primary",
    "bg-secondary",
    "bg-success",
    "bg-danger",
    "bg-warning",
    "bg-info",
    "bg-light",
    "bg-dark",
    "bg-white",
    "bg-transparent"
];

const genBack = () => backgrounds[Math.floor(Math.random() * backgrounds.length)];

export default class User extends Component {

    state = {
        details: [],
        repos: []
    };

    loadedUser = data => {
        let date = new Date(data.created_at);
        Swal({
            title: data.name,
            text: data.bio || 'Not exists bio',
            imageUrl: data.avatar_url,
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: data.name + ' profile image',
            animation: true,
            confirmButtonText: "Load Repositories",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            html: `
                <p><code>ID: </code>${data.id}</p>
                <p><code>Login: </code>${data.login}</p>
                <p><code>Profile: </code>${data.html_url}</p>
                <p><code>Created at: </code>${date.today()} at ${date.timeNow()}</p>
            `
        }).then(async (result) => {
            if (result.value) {
                const repos = await this.loadRepos(data.login);
                console.log(repos);
                Swal({
                    title: data.name,
                    text: 'List all repositorys from ' + data.name,
                    imageUrl: data.avatar_url,
                    imageWidth: 400,
                    imageHeight: 300,
                    imageAlt: data.name + ' profile image',
                    animation: true,
                    showConfirmButton: false,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    html: `
                        ${ repos.map(repo => `
                            <div class="card ${genBack()}" style="width: 100%;margin-top:20px;margin-bottom:20px;">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <code>ID: </code>${repo.id}
                                    </li>
                                    <li class="list-group-item">
                                        <code>Name: </code>${repo.name}
                                    </li>
                                    <li class="list-group-item">
                                        <code>URL: </code>
                                        <a href="${repo.html_url}" target="_blank">Access link of repository</a>
                                    </li>
                                </ul>
                            </div>
                        `).join('') }
                    `
                });
            }
        });
    };

    loadDetails = (id) => new Promise((Resolve, Reject) => {
        fetch('/api/user/' + id)
          .then(res => res.json())
          .then(res => {
            Resolve(res);
          })
          .catch(err => Reject(err));
    });
    
    loadRepos = (id) => new Promise((Resolve, Reject) => {
        fetch('/api/user/' + id + '/repos')
          .then(res => res.json())
          .then(res => {
            Resolve(res);
          })
          .catch(err => Reject(err));
    });

    details = async (e, i) => {
        e.preventDefault();
        const data = await this.loadDetails(i);
        this.loadedUser(data);
    };

    render(){
        const card = this.props.data;
        return (
            <div className="col">
              <div className="card" style={{width: "18rem"}}>
                <img className="card-img-top" src={card.avatar_url} alt="Card image cap"/>
                <div className="card-body">
                  <h5 className="card-title"><code>ID: </code>  {card.id}</h5>
                  <h5 className="card-title"><code>Login: </code>  {card.login}</h5>
                  <p className="card-text"></p>
                  <a href="#" className="btn btn-primary" onClick={(e) => this.details(e, card.login)}>
                    Read More
                  </a>
                </div>
              </div>
            </div>
        );
    }

}