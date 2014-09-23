knockout-table
==============

Knockout plugin for displaying arrays of models as a table.

<h3>Goals:</h3>
<ul>
<li>Separation of UI and Javascript code.</li>
<li>Give the design and program flexibility</li>
<li>Efficiently work with large datasets.</lI>
</ul>

<h3>Dependencies</h3>
<ul>
<li><a href="http://jquery.com">JQuery</a></li>
<li><a href="http://knockoutjs.com">Knockoutjs</li>
<li><a href="https://github.com/seiyria/bootstrap-slider">Bootstrap-slider</a></li>
</ul>

<h3>Basic Example</h3>
<p>Create a knockout model to represent your data.</p>

<strong>HTML</strong>

    <html>
    <head>
      <script src="jquery.min.js"></script>
      <script src="knockout.min.js"></script>
      <script src="bootstrap-slider.min.js"></script>
      <script src="knockout-table.js"></script>
    </head>
    <body>
    <div id='simpleDemo'>
      <div style="float: right;">
				<input class="scrollbar" type="text" 
						data-slider-tooltip="hide"
						data-slider-min="-100"
						data-slider-step="1"
						data-slider-orientation="vertical"
						data-slider-max="100"
						data-slider-value="0"
						data-slider-natural_arrow_keys="true"
					/>
			</div>
      <table>
        <thead>
          <tr>
            <th>Column Title</th>
          </tr>
        </thead>
        <tbody>
          <!-- ko foreach: getCurrentPage -->
            <tr>
              <td>
                <span data-bind="text: propertyName"></span>
              </td>
            </tr>
          <!-- /ko -->
        </tbody>
      <table>
    </div>
    </body>
    </html>
    
<strong>Javasript:</strong>

  <em>View Model</em>

    myViewModel_vm = function() {
      var self = this;
      self.propertyName = ko.observable('');
    }

  <em>Application</em>

    $(document).ready( function() {
      demo1 = new knockout_table_vm( { 
        'id':'simpleDemo',
        'model':myViewModel_vm 
      });
      
      //Apply only to the table.
      ko.applyBindings( demo1, document.getElementById('simpleDemo') );
      //Or apply to the whole page.
      //ko.applyBindings( demo1 );
    }
