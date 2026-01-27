"use client";

import { LoansById, useLoanContext } from "@/context/loan.context";
import { useUserContext } from "@/context/user.context";
import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
import { validateNumber } from "@/utils/formValidation";
import { Button, Form, Input, Select, Space } from "antd";
import { useRouter } from "next/navigation";
import { EditOutlined, DollarOutlined, CalendarOutlined, CheckCircleOutlined, UserOutlined, ShareAltOutlined } from "@ant-design/icons";

const UpdateLoan = ({ params }: { params: { loanId: string } }) => {
  const { loanId } = params;
  const router = useRouter();
  const { loans, setLoans } = useLoanContext();
  const { user } = useUserContext();

  const currentLoan = loans[parseInt(loanId)];

  if (!currentLoan) {
    router.push(`/users/${user}`);
    return null;
  }

  const { amount, apr, term, status, owner_id: ownerId } = currentLoan;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const onFinish = async (values: LoanSchemaBase) => {
    try {
      const response = await fetch(`/api/loans/${loanId}?user_id=${user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const updatedLoan: LoanSchema = {
          ...currentLoan,
          ...values,
        };

        const updatedLoans: LoansById = {
          ...loans,
          [updatedLoan.id]: updatedLoan,
        };

        setLoans(updatedLoans);

        const data: LoanSchema = await response.json();
        if (data?.id) {
          router.push(`/loans/${data.id}`);
        } else {
          router.push(`/users/${user}`);
        }
      } else {
        console.error("Ошибка:", response.status);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Не удалось:", errorInfo);
  };

  const canEdit = user === ownerId;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <EditOutlined className="text-3xl text-indigo-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Обновить займ {loanId}
          </h1>
        </div>
        <Space size="middle" wrap>
          <Button
            type="default"
            icon={<CalendarOutlined />}
            onClick={() => handleNavigate(`/loans/${loanId}`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            График
          </Button>
          <Button
            type="default"
            icon={<DollarOutlined />}
            onClick={() => handleNavigate(`/loans/${loanId}/history`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            История платежей
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleNavigate(`/loans/${loanId}/update`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            Обновить займ
          </Button>
          <Button
            type="default"
            icon={<ShareAltOutlined />}
            onClick={() => handleNavigate(`/loans/${loanId}/share`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            Предоставить займ
          </Button>
        </Space>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl">
        {!canEdit && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800">
              ⚠️ Только владельцы могут изменять займ
            </p>
          </div>
        )}
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true, amount, apr, term, status, owner_id: ownerId }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="space-y-4"
        >
          <Form.Item
            label={<span className="text-slate-700 font-medium">Сумма займа</span>}
            name="amount"
            rules={[
              { required: true, message: "Пожалуйста, введите сумму!" },
              { validator: validateNumber },
            ]}
          >
            <Input
              type="number"
              size="large"
              prefix={<DollarOutlined className="text-slate-400" />}
              placeholder="Введите сумму займа"
              className="rounded-lg"
              disabled={!canEdit}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-slate-700 font-medium">Годовая процентная ставка (%)</span>}
            name="apr"
            rules={[
              { required: true, message: "Пожалуйста, введите годовую процентную ставку!" },
              { validator: validateNumber },
            ]}
          >
            <Input
              type="number"
              size="large"
              placeholder="Введите процентную ставку"
              className="rounded-lg"
              disabled={!canEdit}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-slate-700 font-medium">Срок (месяцы)</span>}
            name="term"
            rules={[
              { required: true, message: "Пожалуйста, введите срок!" },
              { validator: validateNumber },
            ]}
          >
            <Input
              type="number"
              size="large"
              prefix={<CalendarOutlined className="text-slate-400" />}
              placeholder="Введите срок займа"
              className="rounded-lg"
              disabled={!canEdit}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-slate-700 font-medium">Статус</span>}
            name="status"
            rules={[{ required: true, message: "Пожалуйста, выберите статус!" }]}
          >
            <Select
              size="large"
              className="rounded-lg"
              options={[
                { value: "active", label: "Активный" },
                { value: "inactive", label: "Неактивный" },
              ]}
              disabled={!canEdit}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-slate-700 font-medium">ID владельца</span>}
            name="owner_id"
            rules={[{ required: true, message: "Пожалуйста, введите ID владельца!" }]}
          >
            <Input
              type="number"
              size="large"
              prefix={<UserOutlined className="text-slate-400" />}
              disabled={true}
              className="rounded-lg bg-slate-50"
            />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<CheckCircleOutlined />}
              disabled={!canEdit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 rounded-lg h-11 font-medium disabled:opacity-50"
            >
              {canEdit ? "Обновить займ" : "Только владельцы могут изменять займ"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateLoan;
