import { makeAutoObservable, runInAction } from "mobx";
import apiHandler from "../api/apiHandler";
import axios from "axios";
import { store } from "./store";

export interface IStudentDocumentGroup {
    level: string,
    documents: IStudentDocument[]
}

export interface IStudentDocument {
    id?: number,
    userId?: string,
    studentNumber?: string,
    levelCode?: string,
    levelName?: string,
    documentTypeId?: number,
    documentCode?: string,
    documentName: string,
    documentDetail: string,
    documentUrl?: string
}

export default class StudentDocumentStore {
    studentDocument: IStudentDocument | null = null;
    studentDocuments = new Map<number, IStudentDocument>();
    studentDocumentGroups = new Map<string, IStudentDocumentGroup>();

    constructor() {
        makeAutoObservable(this)
    }

    get studentDocumentArrays() {
        if (store.commonStore.offline) {
            return Array.from(studentDocuments.values());
        } else {
            return Array.from(this.studentDocuments.values());
        }
    }

    get studentDocumentGroupArrays() {
        if (store.commonStore.offline) {
            return Array.from(studentDocuments.values());
        } else {
            return Array.from(this.studentDocumentGroups.values());
        }
    }

    load_student_documents = async () => {

        try {
            store.commonStore.setLoading(true)
            const studentDocuments = await apiHandler.StudentDocuments.list();

            studentDocuments.forEach((studentDocument: IStudentDocument) => {
                runInAction(() => {
                    this.studentDocuments.set(studentDocument.id ?? 0, studentDocument)
                    store.commonStore.setLoading(false)

                })
            })

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }

    }

    get_student_document_by_id = async (id: number) => {
        try {
            store.commonStore.setLoading(true)
            this.studentDocument = await apiHandler.StudentDocuments.detail(id);

            store.commonStore.setLoading(false)
            return this.studentDocument

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }

    }

    get_student_document_by_userId = async (id: string) => {
        try {
            store.commonStore.setLoading(true)
            const studentDocumentGroups = await apiHandler.StudentDocuments.list_by_user_id(id);
            studentDocumentGroups.forEach((studentDocumentGroup: IStudentDocumentGroup) => {
                runInAction(() => {
                    this.studentDocumentGroups.set(studentDocumentGroup.level, studentDocumentGroup)
                    store.commonStore.setLoading(false)

                })
            })

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }

    }

    create_student_document = async (studentDocument: IStudentDocument) => {
        try {
            store.commonStore.setLoading(true)
            studentDocument = await apiHandler.StudentDocuments.create(studentDocument);

            runInAction(() => {
                this.studentDocuments.set(studentDocument.id ?? 0, studentDocument)
                store.commonStore.setLoading(false)
            })

            return this.studentDocument

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                store.commonStore.setAlert({ type: "error", message: error.message });
                store.commonStore.setLoading(false)
            }
        }
    }
}

export const studentDocuments: IStudentDocumentGroup[] = [
    {
        level: "100",
        documents: [
            {
                documentName: "O level Result",
                documentDetail: "Download student o level result"
            },
            {
                documentName: "Jamb Result",
                documentDetail: "Download student jamb result"
            },
            {
                documentName: "Jamb Acceptance Letter",
                documentDetail: "Download student jamb acceptance letter",
            },
            {
                documentName: "CU Acceptance letter",
                documentDetail: "Download student convenant university acceptance letter"
            },
            {
                documentName: "Birth certificate",
                documentDetail: "Download student Birth certificate"
            },
            {
                documentName: "Academic reference letter",
                documentDetail: "Download student academic reference letter"
            },
            {
                documentName: "matriculation oath",
                documentDetail: "Download student matriculation oath "
            },
        ]
    },
    {
        level: "200",
        documents: [
            {
                documentName: "Alpha Semester Course Registration",
                documentDetail: "Download student course registration"
            },
            {
                documentName: "Omega Semester Course Registration",
                documentDetail: "Download student course registration"
            },
        ]
    },
    {
        level: "300",
        documents: [
            {
                documentName: "Alpha Semester Course Registration",
                documentDetail: "Download student course registration"
            },
            {
                documentName: "Omega Semester Course Registration",
                documentDetail: "Download student course registration"
            },
        ]
    },
    {
        level: "400",
        documents: [
            {
                documentName: "Alpha Semester Course Registration",
                documentDetail: "Download student course registration"
            },
            {
                documentName: "Omega Semester Course Registration",
                documentDetail: "Download student course registration"
            },
        ]
    },
    {
        level: "500",
        documents: [
            {
                documentName: "Alpha Semester Course Registration",
                documentDetail: "Download student course registration"
            },
            {
                documentName: "Omega Semester Course Registration",
                documentDetail: "Download student course registration"
            },
        ]
    }
]


