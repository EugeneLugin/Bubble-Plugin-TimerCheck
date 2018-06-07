function(instance, context) {

	instance.data.timer = {
      id: null,
      ms: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      getString: function() {        
        return ('0'+instance.data.timer.hours).slice(-2) + ':' +
          		('0'+instance.data.timer.minutes).slice(-2) + ':' +
          		('0'+instance.data.timer.seconds).slice(-2);
      },
      off: function() {
        if (instance.data.timer.id) {
          clearInterval(instance.data.timer.id);
          instance.data.timer.id = null;
        }
      },
      show: function() {
        instance.data.timer.hours = 
          Math.floor(instance.data.timer.ms / 1000 / 60 / 60);
        instance.data.timer.minutes = 
          Math.floor(instance.data.timer.ms / 1000 / 60 - instance.data.timer.hours*60);
        instance.data.timer.seconds = 
          Math.floor(instance.data.timer.ms / 1000 - instance.data.timer.hours*3600 - instance.data.timer.minutes*60);        
        
        instance.publishState('getString', instance.data.timer.getString());        
      },
      check: function() {
        if(instance.data.timer.ms <= 0) {
          instance.data.timer.ms = 0;
          instance.data.timer.off();
          instance.triggerEvent('finished');
        }
      },
      init: function(ms) {
        instance.data.timer.off();
        instance.data.timer.ms = ms;
        instance.data.timer.check();
        instance.data.timer.show();
        
        instance.data.timer.id = setInterval(function() {
          instance.data.timer.ms = instance.data.timer.ms - 1000;
          instance.data.timer.check();          
          instance.data.timer.show();
        }, 1000);
      }
    }

}