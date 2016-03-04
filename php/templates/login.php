<p><h1 class="text-center">Bateria de teste - Vox Domini</h1></p>
<form class="form-horizontal" method="post">
  <div class="form-group <?php echo isset($error)?'has-error':''?>">
    <label for="username" class="col-sm-2 control-label">Nume</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="username" name="username" placeholder="Email">
    </div>
  </div>
  <div class="form-group <?php echo isset($error)?'has-error':''?>">
    <label for="password" class="col-sm-2 control-label">Parola</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="password" name="password" placeholder="Password">
    </div>
  </div>
  <p class="col-sm-offset-2 error-block text-danger <?php echo !isset($error)?'hidden':''?>">Eroare de autentificare!</p>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary btn-login">Login</button>
    </div>
  </div>
</form>