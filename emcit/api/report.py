"""Report API"""
from flask import request, jsonify, Blueprint
from emcit.models import Report
from emcit.resources import ReportResource
from emcit.util import required_access

report_api = Blueprint('report_api', __name__)

@report_api.route('', methods=['GET'])
@required_access('admin')
def get_reports():
    return jsonify(map(ReportResource, Report.get_all()))

@report_api.route('', methods=['POST'])
@required_access('reporter')
def create_report():
    json = request.get_json()

    report = Report.from_json(json)
    report.save()

    return jsonify(ReportResource(report))
