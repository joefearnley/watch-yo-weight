@extends('layout')

@section('content')

    <h1 id="loading" class="glyphicon glyphicon-refresh normal-right-spinner"></h1>

    <div id="weight-list">
    @foreach ($weights as $weight)
        <div class="row weight-list">
            <div class="col-xs-4 col-sm-2">
                {{ $weight->formattedDate() }}
            </div>
            <div class="col-xs-3  col-sm-2">
                {{ $weight->formattedWeight() }}
            </div>
            <div class="col-xs-5  col-sm-8">
                <a type="button" class="btn btn-danger pull-right delete-weight" data-weight-id="{{ $weight->getKey() }}"><i class="glyphicon glyphicon-trash"></i></a>
            </div>
        </div>
        <hr>
    @endforeach
    </div>

    <div id="chart" class="ct-chart ct-perfect-fourth"></div>

    <div id="weigh-in-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Weight</h4>
                </div>
                <div class="modal-body">
                    <form id="add-weight-form" action="/weight/add" method="POST">
                        <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                        <div class="form-group">
                            <label for="weigh-in-date">Date</label>
                            <input type="text" name="date" class="form-control datepicker" id="weigh-in-date" placeholder="mm/dd/yy" value="{{ date('m/d/Y') }}">
                        </div>
                        <div class="form-group">
                            <label for="weight">Weight</label>
                            <input type="text" name="weight" class="form-control" id="weight" placeholder="Weight in lbs.">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="cancel-btn" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" id="save-btn" class="btn btn-primary"><i class="glyphicon glyphicon-ok"></i> Save</button>
                </div>
            </div>
        </div>
    </div>

    <div id="delete-weigh-in-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-body">
                    Are you Sure you want to delete this Weigh In?
                </div>
                <div class="modal-footer">
                    <button type="button" id="cancel-delete-btn" class="btn btn-default" data-dismiss="modal">No</button>
                    <button type="button" id="delete-btn" class="btn btn-primary" data-weight-id="">Yes</button>
                </div>
            </div>
        </div>
    </div>
@stop

@section('scripts')
    <script>
        $(function() {
            buildChart();

            $('#btn-show-list').tooltip();
            $('.datepicker').datepicker({
                autoclose: true,
                todayHighlight: true
            });

            $('#weight-list, #chart').hide();


            $('#btn-show-graph').click(function(e) {
                e.preventDefault();
                $('#weight-list').fadeOut(function() {
                    $('#chart').fadeIn();
                });
            });

            $('#btn-show-list').click(function(e) {
                e.preventDefault();
                $('#chart').fadeOut(function() {
                    $('#weight-list').fadeIn();
                });
            });

            $('#save-btn').click(function (e) {
                e.preventDefault();
                var data = $('#add-weight-form').serialize();
                $.post('/weight/add', data).done(function(response) {
                    $('#weigh-in-modal').modal('hide');
                    location.reload();
                });
            });

            $('#cancel-btn').click(function(e) {
                e.preventDefault();
                $('.datepicker').datepicker('clearDates');
            });

            $('.delete-weight').click(function (e) {
                e.preventDefault();
                $('#delete-btn').data('weight-id', $(this).data('weight-id'));
                $('#delete-weigh-in-modal').modal('show');
            });

            $('#delete-btn').click(function(e) {
                e.preventDefault();
                var data = {
                    id: $(this).data('weight-id')
                };

                $.post('/weight/delete', data).done(function(response) {
                    $('#delete-weigh-in-modal').modal('hide');
                });
            });
        });

        function showChart() {}

        function showList(){}

        function buildChart() {
            $.get('/weight/chart-data', function(response) {
                new Chartist.Line('.ct-chart', {
                    labels: response.dates,
                    series: [response.weights]
                }, {
                    low: 150
                });

                $('#loading').hide();
                $('#chart').show();
            });
        }
    </script>
@stop
