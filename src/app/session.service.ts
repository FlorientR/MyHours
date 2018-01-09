import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class SessionService {

  constructor(private cookieService: CookieService) {}

  sessions;
  total;

  updateSessions() {
    this.sessions = (this.cookieService.get('sessions') ? JSON.parse(this.cookieService.get('sessions')) : []);
    this.updateTotal();
  }

  updateTotal()
  {
      this.total = 0;
      for (let i = 0; i < this.sessions.length; i++)
      {
          this.total += parseInt(this.sessions[i]['total'], 0);
      }
  }

  getSessions() {
    return this.sessions;
  }

  getTotal() {
      return this.total;
  }

  addSession(session) {
      let sessions = this.getSessions();

      let day = null;
      let dayIndice = sessions.length;

      for (let i = 0; i < sessions.length; i++)
      {
          if (sessions[i]['day'] == session.day)
          {
              day = sessions[i];
              dayIndice = i;
              break;
          }
      }

      if (day === null)
          day = {'day': session.day, 'total': 0, 'dates': []};

      let total = this.getTotalMinutes(session.end);
      total -= this.getTotalMinutes(session.begin);

      day.dates.push({
          'begin': session.begin,
          'end': session.end,
          'total': total
      });

      day.total += total;
      sessions[dayIndice] = day;

      sessions = this.reorderSession(sessions);

      this.cookieService.set('sessions', JSON.stringify(sessions));

      this.updateSessions();
  }

  removeSession(indiceSession, indiceDate) {
      let sessions = this.getSessions();

      if (indiceDate === null && sessions && sessions[indiceSession])
      {
          sessions.splice(indiceSession, 1);
      }
      else if (sessions && sessions[indiceSession] && sessions[indiceSession]['dates'] && sessions[indiceSession]['dates'][indiceDate])
      {
          sessions[indiceSession]['total'] -= sessions[indiceSession]['dates'][indiceDate]['total'];
          sessions[indiceSession]['dates'].splice(indiceDate, 1);
          if (sessions[indiceSession]['dates'].length == 0)
              sessions.splice(indiceSession, 1);
      }

      this.cookieService.set('sessions', JSON.stringify(sessions));
      console.log(sessions);
      this.updateSessions();
  }

  getTotalMinutes(hour) {
      const hours = parseInt(hour.substr(0, 2), 0);
      const minutes = parseInt(hour.substr(3, 2), 0);
      return (hours * 60) + minutes;
  }

  reorderSession(sessions)
  {
      sessions.sort(function(item1, item2)
      {
          let firstDate = new Date(item1['day']);
          let secondDate = new Date(item2['day']);

          return firstDate > secondDate;
      });

      let that = this;

      for (let i = 0; i < sessions.length; i++)
      {
          sessions[i]['dates'].sort(function(item1, item2)
          {
              let begin1 = that.getTotalMinutes(item1['begin']);
              let begin2 = that.getTotalMinutes(item2['begin']);
              let end1 = that.getTotalMinutes(item1['end']);
              let end2 = that.getTotalMinutes(item2['end']);

              if (begin1 > begin2)
                  return 1;
              else if (begin1 < begin2)
                  return -1;
              else
              {
                  return end1 > end2;
              }
          });
      }

      return sessions;
  }

  removeAll()
  {
      this.cookieService.set('sessions', JSON.stringify([]));
      this.updateSessions();
  }
}
