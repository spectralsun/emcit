from flask import request, jsonify, Blueprint
from emcit.models import Report
from emcit.resources import ReportResource
from emcit.util import required_access

analytics_api = Blueprint('analytics_api', __name__)

@analytics_api.route('', methods=['POST'])
@required_access('admin', 'analyst')
def create_report():
    return jsonify(map(ReportResource, Report.filter(request.get_json())))
