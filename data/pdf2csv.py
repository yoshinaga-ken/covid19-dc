'''===========================================================================
Convert PDF to CSV

tabula - API REFERENCE
https://tabula-py.readthedocs.io/en/latest/tabula.html

==========================================================================='''

import sys
import numpy as np
import pandas as pd
import tabula

if sys.argv[1]=='okinawa':
	tabula.convert_into(sys.argv[2], sys.argv[3], output_format="csv", pages='3-30')
else:
	tabula.convert_into(sys.argv[2], sys.argv[3], output_format="csv", pages='all')


