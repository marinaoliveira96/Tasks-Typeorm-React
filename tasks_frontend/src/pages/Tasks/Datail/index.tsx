import React, { useState, useEffect } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../services/api';
import moment from 'moment';

interface ITask {
  id: number;
  title: string;
  description: string;
  fineshed: boolean;
  created_at: Date;
  updated_at: Date;
}

interface ParamTypes {
  id: string;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<ParamTypes>();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findtask();
  }, [findtask, id]);

  function back() {
    history.goBack();
  }

  async function findtask() {
    const response = await api.get<ITask>(`/tasks/${id}`);
    console.log(response);
    setTask(response.data);
  }

  function formateDate(date: Date | undefined) {
    return moment(date).format('DD/MM/YYYY');
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tasks Detail</h1>
        <Button variant="dark" size="sm" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>{task?.description}</Card.Text>
          <br />
          <Badge variant={task?.fineshed ? 'success' : 'warning'}>
            {task?.fineshed ? ' FINALIZADO' : 'PENDENTE'}
          </Badge>
          <br />
          <strong>Data de Cadastro: </strong>
          <Badge variant="info">{formateDate(task?.created_at)}</Badge>
          <br />
          <strong>Data de Atualização: </strong>
          <Badge variant="info">{formateDate(task?.updated_at)}</Badge>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;
