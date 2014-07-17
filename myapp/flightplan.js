    var Flightplan = require('flightplan');
    var plan = new Flightplan();
    var tmpDir = 'pstadler-sh-' + new Date().getTime();

    plan.briefing({
      destinations: {
        'production': [
        {
          host: '192.168.50.4',
          username: 'vagrant',
          port:22,
          password:'vagrant'
        }
        ]
      }
    });

plan.local(function(local) {
  local.log('Run build');
  local.exec('gulp');
  local.log(local.hostname());

  if(plan.target.destination === 'production') {
    var input = local.prompt('Ready for deploying to production? [yes]');
    if(input.indexOf('yes') === -1) {
      local.abort('user canceled flight'); 
    }
  }

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files; find build -type f', {silent: true});
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});


plan.remote(function(remote) {
  remote.log('Move folder to web root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: 'vagrant'});
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('In Remote now');

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/'+tmpDir+' install ~/'+tmpDir, {user: 'vagrant'});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/pstadler-sh', {user: 'vagrant'});
  remote.exec("node ~/"+tmpDir+"/app.js");
});
