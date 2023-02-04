import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import { languages } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { Select } from 'antd';
import { getScheduleByDateService } from '../../../services/userService';
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      selectedDay: '',
    };
  }
  onHandleSelect = (value) => {
    this.setState({
      selectedDay: value,
    });
  };

  async componentDidMount() {
    let { language } = this.props;
    this.setArrDays(language);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
      this.setArrDays(this.props.language);
    }
  }

  setArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === languages.VI) {
        object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
      } else {
        object.label = moment(new Date())
          .add(i, 'days')
          .locale('en')
          .format('ddd - DD/MM');
      }
      object.value = moment(new Date()).add(i, 'days').format('DD/MM/YYYY');
      allDays.push(object);
    }
    this.setState({
      allDays,
      selectedDay: allDays[0]?.value,
    });
  };

  render() {
    let { allDays, selectedDay } = this.state;
    console.log('allDays', allDays);
    return (
      <div className='doctorSchedule'>
        <div className='doctorSchedule__day'>
          <Select
            showSearch
            placeholder='Select day'
            optionFilterProp='children'
            onSelect={this.onHandleSelect}
            // onSearch={onSearch}
            style={{ width: 150 }}
            value={selectedDay}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={allDays}
          />
        </div>
        <div className='doctorSchedule__time'></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
