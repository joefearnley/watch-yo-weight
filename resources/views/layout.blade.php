<!doctype html>
<html>
    <head>
        <title>Watch yo Weight</title>
        <link rel="stylesheet" href="css/all.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker3.min.css">
    </head>

    <body>
        <nav class="navbar navbar-inverse">
            <div class="container">
                <a class="navbar-brand" href="#">Watch Yo Weight</a>
                <div id="nav-controls" class="pull-right">
                    <a id="btn-show-graph" class="btn" data-toggle="tooltip" data-placement="left" title="List weigh ins"><i class="glyphicon glyphicon-stats"></i></a>
                    <a id="btn-show-list" class="btn" data-toggle="tooltip" data-placement="left" title="List weigh ins"><i class="glyphicon glyphicon-th-list"></i></a>
                    <a id="btn-show-weight-in-modal" class="btn" data-toggle="modal" data-target="#weigh-in-modal"><i class="glyphicon glyphicon-plus"></i></a>
                </div>
            </div>
        </nav>

        <div id="main-content" class="container">
            @yield('content')
        </div>

        <!-- Bootstrap -->
        <script src="js/all.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/js/bootstrap-datepicker.min.js">

        </script>
        @yield('scripts')
    </body>
</html>
